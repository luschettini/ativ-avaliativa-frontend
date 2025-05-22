import { NextResponse } from "next/server";

export const config = {
    matcher: "/home",
};

export default function middleware(req) {
    return NextResponse.redirect(new URL("/<home>", req.url));
}
