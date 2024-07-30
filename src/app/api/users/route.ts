import { query } from "@/lib/db";

export async function GET(request: Request): Promise<Response> {
    try {
        const users = await query({
            query: "SELECT * FROM members",
            values: [],
        });

        let data = JSON.stringify(users);
        return new Response(data, {
            status: 200,
        });
    } catch (error) {
        return new Response(JSON.stringify({
            status: 500,
            message: 'Internal Server Error',
        }), {
            status: 500,
        });
    }
}

export async function POST(request: Request): Promise<Response> {
    try {
        const { name }: { name: string } = await request.json();
        const updateUsers = await query({
            query: "INSERT INTO members (name) VALUES (?)",
            values: [name],
        });
        const result = updateUsers.affectedRows;
        let message = result ? "success" : "error";
        const members = { name };
        return new Response(JSON.stringify({
            message,
            status: 200,
            product: members
        }), {
            status: 200,
        });
    } catch (error) {
        return new Response(JSON.stringify({
            status: 500,
            message: 'Internal Server Error',
        }), {
            status: 500,
        });
    }
}

export async function PUT(request: Request): Promise<Response> {
    try {
        const { id, visitor_name }: { id: number; visitor_name: string } = await request.json();
        const updateProducts = await query({
            query: "UPDATE members SET name = ? WHERE id = ?",
            values: [visitor_name, id],
        });
        const result = updateProducts.affectedRows;
        let message = result ? "success" : "error";
        const product = { id, visitor_name };
        return new Response(JSON.stringify({
            message,
            status: 200,
            product
        }), {
            status: 200,
        });
    } catch (error) {
        return new Response(JSON.stringify({
            status: 500,
            message: 'Internal Server Error',
        }), {
            status: 500,
        });
    }
}

export async function DELETE(request: Request): Promise<Response> {
    try {
        const { id }: { id: number } = await request.json();
        const deleteUser = await query({
            query: "DELETE FROM members WHERE id = ?",
            values: [id],
        });
        const result = deleteUser.affectedRows;
        let message = result ? "success" : "error";
        const product = { id };
        return new Response(JSON.stringify({
            message,
            status: 200,
            product
        }), {
            status: 200,
        });
    } catch (error) {
        return new Response(JSON.stringify({
            status: 500,
            message: 'Internal Server Error',
        }), {
            status: 500,
        });
    }
}
