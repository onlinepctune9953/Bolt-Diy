import React from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface InputWithLabelProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  description?: string;
  wrapperClassName?: string;
  icon?: React.ReactNode; // Add the icon prop to the interface
}

const InputWithLabel = React.forwardRef<HTMLInputElement, InputWithLabelProps>(
  ({ label, description, className, wrapperClassName, id, icon, ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className={cn("space-y-2", wrapperClassName)}>
        <div className="space-y-1">
          <Label htmlFor={inputId} className="text-sm font-medium">
            {label}
          </Label>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {icon}
            </div>
          )}
          <Input
            ref={ref}
            id={inputId}
            className={cn(
              "transition-all duration-200 focus:ring-2 focus:ring-primary/20 focus:border-primary",
              icon && "pl-10", // Add left padding when icon is present
              className
            )}
            {...props}
          />
        </div>
      </div>
    );
  }
);

InputWithLabel.displayName = "InputWithLabel";

export default InputWithLabel;
