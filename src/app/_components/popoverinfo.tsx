import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import Image from "next/image";

export function PopoverInfo({ text }: { text: string }) {
  return (
    <Popover>
      <PopoverTrigger>
        <Image
          src="/question-mark.svg"
          alt="Info"
          width={16}
          height={16}
          className="ml-2 inline h-4 w-4 cursor-pointer"
        />
      </PopoverTrigger>
      <PopoverContent>
        <p>{text}</p>
      </PopoverContent>
    </Popover>
  );
}
