import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Address from "@/models/address";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    await connectToDB();

    // console.log(req, "request all addresses");
    const { searchParams } = new URL(req.url);
    // console.log({ searchParams }, "search params all address");
    const id = searchParams.get("id");
    // console.log(id, "id all address");

    if (!id) {
      return NextResponse.json({
        success: false,
        message: "You are not logged In",
      });
    }

    const isAuthUser = await AuthUser(req);

    if (isAuthUser) {
      const getAllAddresses = await Address.find({ userID: id });

      if (getAllAddresses) {
        return NextResponse.json({
          success: true,
          data: getAllAddresses,
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "failed to get addresses ! Please try again",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "You are not authenticated",
      });
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      success: false,
      message: "Something went wrong ! Please try again later",
    });
  }
}
