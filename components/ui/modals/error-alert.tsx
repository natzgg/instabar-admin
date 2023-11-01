"use client";

import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ErrorAlertProps {
  onConfirm: () => void;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ onConfirm }) => {
  return (
    <div className="flex items-center w-full justify-center">
      <Alert variant="destructive" className="w-1/2">
        <AlertTitle>No billboards found.</AlertTitle>
        <AlertDescription>Please create a billboard first.</AlertDescription>
        <div className="flex justify-end">
          <Button
            type="button"
            onClick={onConfirm}
            variant="outline"
            className="text-black"
          >
            Confirm
          </Button>
        </div>
      </Alert>
    </div>
  );
};

export default ErrorAlert;
