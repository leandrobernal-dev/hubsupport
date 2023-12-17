import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";

export default function ApplyCoupon({
  setCurrentPrice,
  price,
  setDiscount,
  setCouponCode,
}) {
  const formSchema = z.object({
    coupon: z.string(),
  });
  const form = useForm({ resolver: zodResolver(formSchema) });
  const [isLoading, setIsLoading] = useState(false);

  const applyCoupon = async (e) => {
    setIsLoading(true);
    const values = form.getValues();
    let error = "Required";
    if (!values.coupon) {
      form.setError("coupon", { message: error });
      setIsLoading(false);
      return;
    }
    axios.post("/api/checkout/coupon", { ...values }).then(({ data }) => {
      if (data.discountAmount) {
        setCurrentPrice(price - data.discountAmount.amount);
        setDiscount(data.discountAmount.amount);
        setCouponCode(values.coupon);
        setIsLoading(false);
      } else {
        error = "Invalid coupon code";
        form.setError("coupon", { message: error });
        setIsLoading(false);
      }
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(applyCoupon)} className="space-y-8">
        <FormField
          control={form.control}
          name="coupon"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Apply Coupon Code</FormLabel>
              <div className="flex w-full items-center space-x-2">
                <FormControl>
                  <Input placeholder="coupon_code" {...field} />
                </FormControl>
                <Button type="submit" disabled={isLoading}>
                  <ReloadIcon
                    className={`mr-2 h-4 w-4 animate-spin ${
                      !isLoading && "hidden"
                    }`}
                  />
                  Apply
                </Button>
              </div>
              <FormDescription>Enter a Valid Coupon Code.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
