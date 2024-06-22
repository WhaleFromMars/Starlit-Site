import Stripe from "stripe";

function chunkArray<T>(array: T[], chunkSize: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
}

export default async function StorePage() {
  const stripe = new Stripe(process.env.STRIPE_SECRET!, {
    apiVersion: "2024-04-10",
  });

  const products = await stripe.products.list({
    limit: 100,
  });

  const productsByCategory = new Map<string, Stripe.Product[]>();

  products.data.forEach((product) => {
    const category = product.metadata?.category;
    if (category) {
      const categoryProducts = productsByCategory.get(category) ?? [];
      categoryProducts.push(product);
      productsByCategory.set(category, categoryProducts);
    }
  });

  console.log(productsByCategory);

  return (
    <main className="p-4">
      {Array.from(productsByCategory.entries()).map(([category, products]) => (
        <div key={category} className="mb-8 text-white">
          <h1 className="mb-4 text-center text-3xl font-bold">{category}</h1>
          {chunkArray(products, 3).map((productRow, rowIndex) => (
            <div
              key={rowIndex}
              className="gap-4 mb-4 flex flex-wrap justify-center"
            >
              {productRow.map((product) => (
                <div
                  key={product.id}
                  className="max-w-xs flex-1 text-center sm:max-w-none sm:flex-none"
                >
                  <p>{product.name}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </main>
  );
}
