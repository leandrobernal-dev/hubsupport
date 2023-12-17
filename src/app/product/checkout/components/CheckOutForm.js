"use client";

import React, { useRef, useState } from "react";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import { Input } from "@/components/ui/input";
import { Save, ShoppingCart } from "lucide-react";
import { DropinSkeleton } from "@/app/product/checkout/components/DropInSkeleton";

const CheckOutForm = ({ clientToken, user, couponCode, planId }) => {
  const instanceRef = useRef(null);
  const [loading, setLoading] = useState(true);

  const additionalFormSchema = {
    email: {
      type: "email",
      message: "Invalid email address.",
      name: "email",
      defaultValue: user ? user.email : "",
      fieldName: "Email",
      disabled: true,
      placeholder: "info@youremail.com",
      description: "Enter your email address.",
    },
    firstName: {
      type: "text",
      message: "First name is required.",
      name: "firstName",
      defaultValue: user ? user.firstName : "",
      fieldName: "First Name",
      disabled: false,
      placeholder: "John",
      description: "Enter your first name.",
    },
    lastName: {
      type: "text",
      message: "Last name is required.",
      name: "lastName",
      defaultValue: user ? user.lastName : "",
      fieldName: "Last Name",
      disabled: false,
      placeholder: "Doe",
      description: "Enter your last name.",
    },
    address: {
      type: "text",
      message: "Address is required.",
      name: "address",
      defaultValue: user ? user.address : "",
      fieldName: "Address",
      disabled: false,
      placeholder: "123 Main St",
      description: "Enter your address.",
    },
    city: {
      type: "text",
      message: "City is required.",
      name: "city",
      defaultValue: user ? user.city : "",
      fieldName: "City",
      disabled: false,
      placeholder: "New York",
      description: "Enter your city.",
    },
    country: {
      type: "text",
      message: "Country is required.",
      name: "country",
      defaultValue: user ? user.country : "",
      fieldName: "Country",
      disabled: false,
      placeholder: "United States",
      description: "Enter your country.",
    },
    zip: {
      type: "text",
      message: "Zip code is required.",
      name: "zip",
      defaultValue: user ? user.zip : "",
      fieldName: "Zip Code",
      disabled: false,
      placeholder: "12345",
      description: "Enter your zip code.",
    },
    website: {
      type: "text",
      message: "Website is required.",
      name: "website",
      defaultValue: user ? user.website : "",
      fieldName: "Website",
      disabled: false,
      placeholder: "https://www.example.com",
      description: "Enter your website URL.",
    },
  };
  const formSchema = z.object({
    email: z.string().email({ message: "Invalid email address." }),
    website: z.string().url({ message: "Invalid website URL." }),
    firstName: z.string().min(1, { message: "First name is required." }),
    lastName: z.string().min(1, { message: "Last name is required." }),
    address: z.string().min(1, { message: "Address is required." }),
    city: z.string().min(1, { message: "City is required." }),
    country: z.string().min(1, { message: "Country is required." }),
    zip: z.string().min(1, { message: "Zip code is required." }),
  });
  const form = useForm({ resolver: zodResolver(formSchema) });

  const savePaymentMethod = async () => {
    const { nonce } = await instanceRef.current.requestPaymentMethod();
  };
  const buy = async () => {
    const values = form.getValues();
    const { nonce } = await instanceRef.current.requestPaymentMethod();
    axios
      .post("/api/checkout", { nonce, ...values, couponCode, planId })
      .then(({ data }) => {
        console.log(data);
      });
  };

  return (
    <>
      <div className="space-y-4">
        {loading && <DropinSkeleton />}
        <DropIn
          options={{ authorization: clientToken }}
          onInstance={(instance) => {
            instanceRef.current = instance;
            setLoading(false);
          }}
        />
        <Button onClick={savePaymentMethod}>
          <Save className="mr-2 h-4 w-4" />
          Save Payment Method
        </Button>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(buy)} className="pt-4">
          {Object.keys(formSchema.shape).map((fieldName) => (
            <FormField
              key={fieldName}
              control={form.control}
              name={fieldName}
              render={({ field }) => (
                <FormItem className="py-2">
                  <FormLabel>
                    {additionalFormSchema[fieldName].fieldName}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={additionalFormSchema[fieldName].placeholder}
                      {...field}
                      defaultValue={
                        additionalFormSchema[fieldName].defaultValue
                      }
                      value={additionalFormSchema[fieldName].value}
                      // disabled={additionalFormSchema[fieldName].disabled}
                    />
                  </FormControl>
                  <FormDescription>
                    {additionalFormSchema[fieldName].description}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <Button type="submit" className="my-4 w-full">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Purchase
          </Button>
        </form>
      </Form>
    </>
  );
};

export default CheckOutForm;
