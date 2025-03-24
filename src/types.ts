export type AIMessage =
  | { role: "assistant"; content: string }
  | { role: "user"; content: string }
  | { role: "tool"; content: string; tool_call_id: string };

export interface Toolfn<A = any, T = any> {
  (input: { userMessage: string; toolargs: A }): Promise<T>;
}
