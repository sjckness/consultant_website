export type MessageRow = {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
};

export type ClientRowData = {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  notes: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export const CLIENT_STATUSES = [
  "lead",
  "contacted",
  "active",
  "won",
  "lost",
  "archived",
] as const;

export const inputStyle: React.CSSProperties = {
  background: "var(--bg-deep)",
  border: "1px solid var(--rule)",
  color: "var(--ink)",
};
