"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

export function UserAuthForm({ className, ...props }) {
	const searchParams = useSearchParams();
	const path = usePathname();
	const router = useRouter();

	const callbackUrl = searchParams.get("callbackUrl")
		? searchParams.get("callbackUrl")
		: "/";

	const [isLoading, setIsLoading] = useState(false);

	const handleGoogleLogin = async (e) => {
		await signIn("google", {
			callbackUrl: callbackUrl,
		});
	};
	const handleGithubLogin = async (e) => {
		await signIn("github", {
			callbackUrl: callbackUrl,
		});
	};

	const handleLogin = async (event) => {
		event.preventDefault();
		setIsLoading(true);

		const formElements = event.currentTarget.elements;
		const data = {
			email: formElements.email.value,
			password: formElements.password.value,
		};
		await signIn("credentials", {
			email: data.email,
			password: data.password,
			redirect: false,
		})
			.then(({ ok, error }) => {
				if (ok) {
					router.push(callbackUrl);
				} else {
					console.log(error);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div className={cn("grid gap-6", className)} {...props}>
			<form onSubmit={handleLogin}>
				<div className="grid gap-2">
					<div className="grid gap-1">
						<Label className="sr-only" htmlFor="email">
							Email
						</Label>
						<Input
							id="email"
							placeholder="name@example.com"
							type="email"
							name="email"
							autoCapitalize="none"
							autoComplete="email"
							autoCorrect="off"
							disabled={isLoading}
							required
						/>
					</div>
					<div className="grid gap-1">
						<Label className="sr-only" htmlFor="email">
							Email
						</Label>
						<Input
							id="password"
							placeholder="*******"
							type="password"
							name="password"
							autoCapitalize="none"
							autoComplete="password"
							autoCorrect="off"
							disabled={isLoading}
							required
						/>
					</div>
					<Button disabled={isLoading}>
						{isLoading && (
							<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
						)}
						{path === "/auth/login"
							? "Sign In with Email"
							: "Sign Up with Email"}
					</Button>
				</div>
			</form>
			<div className="relative">
				<div className="absolute inset-0 flex items-center">
					<span className="w-full border-t" />
				</div>
				<div className="relative flex justify-center text-xs uppercase">
					<span className="bg-background text-muted-foreground px-2">
						Or continue with
					</span>
				</div>
			</div>
			<Button
				variant="outline"
				onClick={handleGithubLogin}
				type="button"
				disabled={isLoading}
			>
				{isLoading ? (
					<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
				) : (
					<Icons.gitHub className="mr-2 h-4 w-4" />
				)}{" "}
				Github
			</Button>
			<Button
				variant="outline"
				onClick={handleGoogleLogin}
				type="button"
				disabled={isLoading}
			>
				{isLoading ? (
					<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
				) : (
					<Icons.google className="mr-2 h-4 w-4" />
				)}{" "}
				Google
			</Button>
		</div>
	);
}
