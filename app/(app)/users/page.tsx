import { listUsers } from "@/lib/db/queries/users";
import { requireSession } from "@/lib/auth/session";
import { PageHeader } from "@/components/shared/page-header";
import { UsersTable } from "./users-table";

export default async function UsersPage() {
  const session = await requireSession();
  const users = await listUsers();

  return (
    <div className="space-y-8">
      <PageHeader
        title="User Management"
        description="Kelola user internal, role, status aktif, dan reset password."
      />
      <UsersTable users={users} currentUserId={session.id} />
    </div>
  );
}
