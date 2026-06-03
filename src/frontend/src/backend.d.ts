import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export type Rating = bigint;
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export interface http_header {
    value: string;
    name: string;
}
export type ReviewResult = {
    __kind__: "ok";
    ok: string;
} | {
    __kind__: "err";
    err: string;
};
export enum BusinessType {
    Cafe = "Cafe",
    SaaS = "SaaS",
    OnlineBrand = "OnlineBrand"
}
export interface backendInterface {
    generateReview(businessType: BusinessType, rating: Rating): Promise<ReviewResult>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
}
