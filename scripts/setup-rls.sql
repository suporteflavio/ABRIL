-- =============================================================================
-- Election SaaS – PostgreSQL Row Level Security (RLS) Setup
-- Run this script ONCE during database initialization (included in docker-compose)
-- =============================================================================

-- Enable RLS on tenant-scoped tables
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Create a function to get the current tenant ID from session variable
CREATE OR REPLACE FUNCTION current_tenant_id() RETURNS UUID AS $$
BEGIN
  RETURN current_setting('app.current_tenant_id', true)::UUID;
EXCEPTION
  WHEN OTHERS THEN
    RETURN NULL;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;

-- ---- Policies for tenants table -----------------------------------------
CREATE POLICY tenant_isolation ON tenants
  USING (id = current_tenant_id() OR current_setting('app.current_tenant_id', true) IS NULL);

-- ---- Policies for users table -------------------------------------------
CREATE POLICY tenant_isolation ON users
  USING (tenant_id = current_tenant_id() OR current_setting('app.current_tenant_id', true) IS NULL);

-- ---- Policies for subscriptions table -----------------------------------
CREATE POLICY tenant_isolation ON subscriptions
  USING (tenant_id = current_tenant_id() OR current_setting('app.current_tenant_id', true) IS NULL);

-- ---- Policies for audit_logs table --------------------------------------
CREATE POLICY tenant_isolation ON audit_logs
  USING (tenant_id = current_tenant_id() OR current_setting('app.current_tenant_id', true) IS NULL);

-- Grant usage on schema
GRANT USAGE ON SCHEMA public TO election_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO election_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO election_user;
