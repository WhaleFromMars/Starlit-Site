import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import Image from "next/image";

export function TooltipInfo({ text }: { text: string }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Image
            src="/question-mark.svg"
            alt="Info"
            width={16}
            height={16}
            className="ml-2 inline h-4 w-4 cursor-pointer"
          />
        </TooltipTrigger>
        <TooltipContent>
          <p>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
