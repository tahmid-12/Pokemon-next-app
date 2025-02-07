import { NextRequest, NextResponse } from "next/server";

{/* 2:13:10 */}
export async function POST(req: NextRequest){
    try {
        return NextResponse.json({ message: "Liking or Bookmarking is successful"});
    } catch (error) {
        console.log("Error in Liking or Bookmarking:", error);

        return NextResponse.json(
            {message: "An error occured while processing your request"},
            {status: 500}
        );
    }
}