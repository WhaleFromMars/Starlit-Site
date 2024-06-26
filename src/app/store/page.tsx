import Stripe from "stripe"
import { StoreCard } from "../_components/storecard"

function sortProductsByDorder(
  productsByCategory: Map<string, Stripe.Product[]>,
): Map<string, Stripe.Product[]> {
  const sortedProductsByCategory = new Map<string, Stripe.Product[]>()

  productsByCategory.forEach((products, category) => {
    const sortedProducts = products.sort((a, b) => {
      const aOrder = a.metadata?.dorder
        ? parseInt(a.metadata.dorder)
        : Number.MAX_SAFE_INTEGER
      const bOrder = b.metadata?.dorder
        ? parseInt(b.metadata.dorder)
        : Number.MAX_SAFE_INTEGER

      return aOrder - bOrder
    })

    sortedProductsByCategory.set(category, sortedProducts)
  })

  return sortedProductsByCategory
}

function sortCategoriesByName(
  sortedProductsByCategory: Map<string, Stripe.Product[]>,
): Map<string, Stripe.Product[]> {
  const newSortedProductsByCategory = new Map<string, Stripe.Product[]>()

  const predefinedOrder = ["Ranks", "Battle Pass"]
  const remainingCategories: [string, Stripe.Product[]][] = []

  // Add predefined categories to the new map if they exist
  predefinedOrder.forEach((category) => {
    const products = sortedProductsByCategory.get(category)
    if (products) {
      newSortedProductsByCategory.set(category, products)
      sortedProductsByCategory.delete(category)
    }
  })

  // Collect remaining categories
  sortedProductsByCategory.forEach((products, category) => {
    remainingCategories.push([category, products])
  })

  // Sort remaining categories by name and add to the new map
  remainingCategories.sort(([a], [b]) => a.localeCompare(b))
  remainingCategories.forEach(([category, products]) => {
    newSortedProductsByCategory.set(category, products)
  })

  return newSortedProductsByCategory
}

export default async function StorePage() {
  const stripe = new Stripe(process.env.STRIPE_SECRET!, {
    apiVersion: "2024-04-10",
  })

  const products = await stripe.products.list({
    limit: 100,
  })

  const productsByCategory = new Map<string, Stripe.Product[]>()

  products.data.forEach((product) => {
    const category = product.metadata?.category
    if (category) {
      const categoryProducts = productsByCategory.get(category) ?? []
      categoryProducts.push(product)
      productsByCategory.set(category, categoryProducts)
    }
  })

  let sortedProductsByCategory = sortProductsByDorder(productsByCategory)
  sortedProductsByCategory = sortCategoriesByName(sortedProductsByCategory)

  return (
    <main className="p-4">
      {Array.from(sortedProductsByCategory.entries()).map(
        ([category, products]) => (
          <div key={category} className="mb-8 text-white">
            <h1 className="mb-4 text-center text-3xl font-bold">{category}</h1>
            <div className="grid grid-cols-1 gap-2 px-4 py-4 sm:grid-cols-2 lg:grid-cols-3 lg:px-32">
              {products.map((product) => (
                <div key={product.id} className="p-2">
                  <StoreCard product={product} />
                </div>
              ))}
            </div>
          </div>
        ),
      )}
    </main>
  )
}
