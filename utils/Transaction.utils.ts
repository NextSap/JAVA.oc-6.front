import {TransactionResponseSchemaType} from "@/objects/response/transaction.response";

export const isSender = (transaction: TransactionResponseSchemaType, userEmail: string) => {
    return userEmail == transaction.sender;
}

export const fullName = (user: { email: string, firstName: string, lastName: string }): string => {
    return user.firstName + " " + user.lastName.toUpperCase();
}

export const truncate = (str: string) => {
    const n = 30;
    return str?.length > n ? str.substring(0, n - 1) + "..." : str;
}