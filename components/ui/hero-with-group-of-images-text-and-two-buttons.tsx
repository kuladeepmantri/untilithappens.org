import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ReactNode } from "react";

interface HeroProps {
  title: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  primaryIcon?: ReactNode;
  secondaryIcon?: ReactNode;
}

export function Hero({
  title,
  description,
  primaryCta,
  secondaryCta,
  primaryIcon,
  secondaryIcon
}: HeroProps) {
  return (
    <div className="w-full py-20 lg:py-32">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-8 items-center md:grid-cols-2">
          <div className="flex gap-4 flex-col">
            <div>
              <Badge variant="outline">Critical Alert</Badge>
            </div>
            <div className="flex gap-4 flex-col">
              <h1 className="text-4xl md:text-6xl max-w-lg tracking-tighter text-left font-bold">
                {title}
              </h1>
              <p className="text-xl leading-relaxed tracking-tight text-muted-foreground max-w-md text-left">
                {description}
              </p>
            </div>
            <div className="flex flex-row gap-4">
              <Button size="lg" className="gap-2">
                {primaryCta}
                {primaryIcon}
              </Button>
              <Button size="lg" className="gap-2" variant="outline">
                {secondaryCta}
                {secondaryIcon}
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted rounded-md aspect-square animate-pulse"></div>
            <div className="bg-muted rounded-md row-span-2 animate-pulse delay-100"></div>
            <div className="bg-muted rounded-md aspect-square animate-pulse delay-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
} 