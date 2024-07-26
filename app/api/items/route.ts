import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const client = new PrismaClient();

export async function GET(req:NextRequest) {
    const user = await client.user.findMany({});

    return NextResponse.json(user, { status: 200 });
}


export async function POST(req:NextRequest) {
    const newUser = await req.json();

    const createdUser = await client.user.create({
        data: {
            name: newUser.name,
        },
    });

    return NextResponse.json(createdUser, { status: 201 });

}

export async function PUT(req:NextRequest) {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    const updatedUser = await req.json();

    const user = await client.user.update({
        where: { id: Number(id) },
        data: { name: updatedUser.name },
    })

    return NextResponse.json(user, { status: 200 });
}

export async function DELETE(req:NextRequest) {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    await client.user.delete({
        where: { id: Number(id) },
    });

    return NextResponse.json(null, {status: 204});

}
