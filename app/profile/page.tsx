import { AppShell } from "@/components/layout/app-shell";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileSettings } from "@/components/profile/profile-settings";
import { OrganizationSettings } from "@/components/profile/organization-settings";
import { ThemeSettings } from "@/components/profile/theme-settings";

export default function ProfilePage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-2xl font-semibold text-white sm:text-3xl">
          Profile & Settings
        </h1>
        <p className="mt-1 text-sm text-ink-muted">
          Manage your personal details, organization, and appearance preferences.
        </p>

        <Tabs defaultValue="profile" className="mt-8">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="organization">Organization</TabsTrigger>
            <TabsTrigger value="theme">Theme</TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <ProfileSettings />
          </TabsContent>
          <TabsContent value="organization">
            <OrganizationSettings />
          </TabsContent>
          <TabsContent value="theme">
            <ThemeSettings />
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  );
}
