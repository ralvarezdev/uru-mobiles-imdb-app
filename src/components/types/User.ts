import { User } from "@/entities/User";

export type UserLogin = {
    username: string,
    password: string
}

export const mockUser: User = {
    id: "1",
    name: "Juan Pérez",
    username: "juanperez",
    email: "juan.perez@email.com",
    role: "user",
    stats: {
        moviesRated: 47,
        comments: 23,
        averageRating: 8.5,
    },
    createdAt: "2024-01-15",
};