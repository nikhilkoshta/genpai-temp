import { NextRequest, NextResponse } from "next/server";

interface Items {
    id : string,
    name : string
}

let items: Items[] = [];

export async function GET(req:NextRequest) {
    return NextResponse.json(items, {status: 200});
}


export async function POST(req:NextRequest) {
    const newItem: Items = await req.json();

    items.push(newItem);

    return NextResponse.json(newItem, {status: 201});

}

export async function PUT(req:NextRequest) {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    const updatedItem: Items = await req.json();

    items = items.map(item => item.id === id? updatedItem : item);

    return NextResponse.json(updatedItem, {status: 200});
}

export async function DELETE(req:NextRequest) {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    items = items.filter(item => item.id !== id);

    return NextResponse.json(null, {status: 204});

}
