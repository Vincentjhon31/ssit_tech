"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState, useEffect } from "react";
import { LayoutGrid, List, Package, FilterX, Search } from "lucide-react";
import { getProductsAction } from "@/app/admin/products/actions";
import { CATEGORY_LABELS, type Product, type ProductCategory } from "@/lib/products";

function parseCategories(searchParams: ReturnType<typeof useSearchParams>): ProductCategory[] {
  const raw = searchParams.get("categories");
  if (!raw?.trim()) return [];
  const list = raw.split(",").map((s) => s.trim()).filter(Boolean);
  const valid: ProductCategory[] = ["cctv", "access_point", "switch"];
  return list.filter((c): c is ProductCategory => valid.includes(c as ProductCategory));
}

type ViewMode = "grid" | "list";

export default function AdminProductsPage() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getProductsAction().then(({ data, error }) => {
      if (mounted) {
        setLoading(false);
        if (!error) setProducts(data);
      }
    });
    return () => { mounted = false; };
  }, []);

  const categories = useMemo(() => parseCategories(searchParams), [searchParams]);

  const filteredProducts = useMemo(() => {
    let result = products;

    if (categories.length > 0) {
      result = result.filter((p) => categories.includes(p.category));
    }

    const query = searchTerm.trim().toLowerCase();
    if (query) {
      result = result.filter((p) => {
        const name = p.name?.toLowerCase() ?? "";
        const description = p.description?.toLowerCase() ?? "";
        return name.includes(query) || description.includes(query);
      });
    }

    return result;
  }, [products, categories, searchTerm]);

  const searchSuggestions = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return [];

    const byText = products.filter((p) => {
      const name = p.name?.toLowerCase() ?? "";
      const description = p.description?.toLowerCase() ?? "";
      return name.includes(query) || description.includes(query);
    });

    return byText.slice(0, 8);
  }, [products, searchTerm]);

  const priceStr = (p: Product) =>
    typeof p.price === "number" ? p.price.toFixed(2) : "0.00";
  const imageUrl = (p: Product) => (p.image && p.image.trim() ? p.image.trim() : null);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Products</h1>
          <p className="text-sm text-muted-foreground">
            {loading
              ? "Loading…"
              : `Use the search bar and sidebar checkboxes to filter products. Showing ${filteredProducts.length} item${filteredProducts.length !== 1 ? "s" : ""}.`}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <div className="flex rounded-md border border-border bg-muted/30 p-0.5">
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`rounded border-0 bg-transparent p-2 transition-colors ${
                viewMode === "grid" ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
              aria-label="Grid view"
            >
              <LayoutGrid className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("list")}
              className={`rounded border-0 bg-transparent p-2 transition-colors ${
                viewMode === "list" ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
              aria-label="List view"
            >
              <List className="size-4" />
            </button>
          </div>
          <Link
            href="/admin/products/manage-products"
            className="inline-flex shrink-0 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Manage products
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1 max-w-md">
          <label htmlFor="products-search" className="sr-only">
            Search products
          </label>
          <div className="relative w-full">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <input
              id="products-search"
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => {
                // Small delay so click events on suggestions can fire
                setTimeout(() => setShowSuggestions(false), 100);
              }}
              placeholder="Search…"
              className="w-full rounded-full border border-input bg-muted/50 py-2 pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
            />
            {showSuggestions && searchSuggestions.length > 0 && (
              <ul className="absolute z-20 mt-1 max-h-64 w-full overflow-y-auto rounded-md border border-border bg-card py-1 text-sm shadow-lg">
                {searchSuggestions.map((product) => (
                  <li key={product.id}>
                    <button
                      type="button"
                      className="flex w-full items-start gap-2 px-3 py-1.5 text-left hover:bg-muted/70"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        setSearchTerm(product.name ?? "");
                      }}
                    >
                      <span className="truncate font-medium text-foreground">
                        {product.name}
                      </span>
                      <span className="ml-auto shrink-0 text-xs text-muted-foreground">
                        {CATEGORY_LABELS[product.category]}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {loading && viewMode === "grid" && (
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <li
              key={i}
              className="rounded-lg border border-border bg-card overflow-hidden shadow-sm"
            >
              <div className="relative aspect-[4/3] w-full bg-muted animate-pulse" />
              <div className="p-4 space-y-3">
                <div className="h-5 bg-muted rounded animate-pulse" />
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded animate-pulse" />
                  <div className="h-4 bg-muted rounded w-3/4 animate-pulse" />
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="h-5 w-20 bg-muted rounded-full animate-pulse" />
                  <div className="h-5 w-16 bg-muted rounded animate-pulse" />
                  <div className="h-4 w-24 bg-muted rounded animate-pulse" />
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      {loading && viewMode === "list" && (
        <ul className="divide-y divide-border rounded-lg border border-border bg-card">
          {Array.from({ length: 6 }).map((_, i) => (
            <li
              key={i}
              className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:gap-4"
            >
              <div className="h-20 w-24 shrink-0 rounded-md bg-muted animate-pulse" />
              <div className="min-w-0 flex-1 space-y-2">
                <div className="h-5 w-48 bg-muted rounded animate-pulse" />
                <div className="space-y-1.5">
                  <div className="h-4 bg-muted rounded animate-pulse" />
                  <div className="h-4 bg-muted rounded w-3/4 animate-pulse" />
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="h-5 w-20 bg-muted rounded-full animate-pulse" />
                  <div className="h-5 w-16 bg-muted rounded animate-pulse" />
                  <div className="h-4 w-24 bg-muted rounded animate-pulse" />
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      {!loading && viewMode === "grid" && (
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <li
              key={product.id}
              className="rounded-lg border border-border bg-card overflow-hidden shadow-sm transition-shadow hover:shadow"
            >
              {imageUrl(product) && (
                <div className="relative aspect-[4/3] w-full bg-muted">
                  <img
                    src={imageUrl(product)!}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              <div className="p-4">
                <p className="font-medium text-foreground">{product.name}</p>
                {product.description && (
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                )}
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                    {CATEGORY_LABELS[product.category]}
                  </span>
                  <span className="font-semibold text-foreground">₱{priceStr(product)}</span>
                  <span className="text-muted-foreground text-xs">Stocks: {typeof product.stocks === "number" ? product.stocks : 0}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {!loading && viewMode === "list" && (
        <ul className="divide-y divide-border rounded-lg border border-border bg-card">
          {filteredProducts.map((product) => (
            <li
              key={product.id}
              className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:gap-4"
            >
              <div className="h-20 w-24 shrink-0 overflow-hidden rounded-md bg-muted">
                {imageUrl(product) ? (
                  <img
                    src={imageUrl(product)!}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-muted-foreground text-xs">
                    No image
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-foreground">{product.name}</p>
                {product.description && (
                  <p className="mt-0.5 text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                )}
                <div className="mt-1.5 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                    {CATEGORY_LABELS[product.category]}
                  </span>
                  <span className="font-semibold text-foreground">₱{priceStr(product)}</span>
                  <span className="text-muted-foreground text-xs">Stocks: {typeof product.stocks === "number" ? product.stocks : 0}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {!loading && filteredProducts.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/20 px-6 py-16 text-center">
          {categories.length > 0 ? (
            <>
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted/60 text-muted-foreground">
                <FilterX className="h-7 w-7" aria-hidden />
              </div>
              <h2 className="mt-4 text-lg font-semibold text-foreground">
                No products match your filters
              </h2>
              <p className="mt-1.5 max-w-sm text-sm text-muted-foreground">
                No products found for {categories.map((c) => CATEGORY_LABELS[c]).join(", ")}. Try clearing the category checkboxes in the sidebar or choose different categories.
              </p>
              <Link
                href="/admin/products"
                className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <FilterX className="h-4 w-4" aria-hidden />
                Clear filters
              </Link>
            </>
          ) : (
            <>
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted/60 text-muted-foreground">
                <Package className="h-7 w-7" aria-hidden />
              </div>
              <h2 className="mt-4 text-lg font-semibold text-foreground">
                No products yet
              </h2>
              <p className="mt-1.5 max-w-sm text-sm text-muted-foreground">
                Get started by adding products. Use the button above to manage your product catalog.
              </p>
              <Link
                href="/admin/products/manage-products"
                className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Manage products
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}
