import type Stripe from "stripe"
import { Button } from "~/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import { PopoverInfo } from "./popoverinfo"

// Function to format the product description
function formatDescription(product: Stripe.Product) {
  if (!product.description) return { mainDescription: "", bulletPoints: [] }

  const parts = product.description.split(";").filter(Boolean)
  const mainDescription = parts[0]
  const bulletPoints = parts.slice(1).map((point) => {
    const nestedValues: string[] = []
    const cleanedPoint = point.replace(/\|.*?\|/g, (match) => {
      nestedValues.push(match.slice(1, -1)) // Extract text between pipes
      return "" // Remove the nested value from the point
    })
    return { cleanedPoint, nestedValues }
  })

  return { mainDescription, bulletPoints }
}

export function StoreCard({ product }: { product: Stripe.Product }) {
  const { mainDescription, bulletPoints } = formatDescription(product)

  return (
    <Card className="flex h-full flex-col text-wrap border-2 border-white bg-gray-800 text-white">
      <CardHeader className="justify-center text-center">
        <CardTitle>{product.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription className="px-4 text-white text-base">{mainDescription}</CardDescription>
        {bulletPoints.length > 0 && (
          <ul className="mt-2 list-inside list-disc px-8">
            {bulletPoints.map((point, index) => (
              <li key={index}>
                {point.cleanedPoint}
                {point.nestedValues.map((nestedValue, nestedIndex) => (
                  <PopoverInfo key={nestedIndex} text={nestedValue} />
                ))}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
      <CardFooter className="mt-auto justify-center gap-4">
        <Button className="border-2 border-blue-400">Add to Cart</Button>
        <Button className="border-2 border-blue-400 ml-2">More Info </Button>
      </CardFooter>
    </Card>
  )
}
