import { createServer, Model, Response } from "miragejs"

export function makeServer() {
    return createServer({
        models: {
            users: Model,
        },

        seeds(server) {
            server.create("user", {
                id: "123",
                email: "b@b.com",
                password: "p123",
                name: "Bob",
            })
        },

        routes() {
            this.namespace = "api"
            this.passthrough("https://firestore.googleapis.com/**")
            this.passthrough("https://identitytoolkit.googleapis.com/**")
            this.passthrough("https://securetoken.googleapis.com/**")
            this.logging = false
            this.timing = 1000

            this.post("/login", (schema, request) => {
                const { email, password } = JSON.parse(request.requestBody)
                const foundUser = schema.users.findBy({ email, password })
                if (!foundUser) {
                    return new Response(
                        401,
                        {},
                        { message: "No user with those credentials found!" }
                    )
                }
                foundUser.password = undefined
                return {
                    user: foundUser,
                    token: "Enjoy your pizza, here's your tokens.",
                }
            }, { timing: 2000 })
        },
    })
}
