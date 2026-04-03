-- Enable RLS on all tables
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE leaders ENABLE ROW LEVEL SECURITY;
ALTER TABLE meetings ENABLE ROW LEVEL SECURITY;
ALTER TABLE qr_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendees ENABLE ROW LEVEL SECURITY;
ALTER TABLE fuel_vouchers ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_stats ENABLE ROW LEVEL SECURITY;

-- Function to set current tenant
CREATE OR REPLACE FUNCTION set_current_tenant(tenant_id UUID)
RETURNS VOID AS $$
BEGIN
  PERFORM set_config('app.current_tenant', tenant_id::text, false);
END;
$$ LANGUAGE plpgsql;

-- Policies for tenants table (ROOT only)
CREATE POLICY tenants_isolation_policy ON tenants
  USING (id = current_setting('app.current_tenant')::uuid);

-- Policies for users table
CREATE POLICY users_isolation_policy ON users
  USING (tenant_id = current_setting('app.current_tenant')::uuid);

-- Policies for subscriptions table
CREATE POLICY subscriptions_isolation_policy ON subscriptions
  USING (tenant_id = current_setting('app.current_tenant')::uuid);

-- Policies for audit_logs table
CREATE POLICY audit_logs_isolation_policy ON audit_logs
  USING (tenant_id = current_setting('app.current_tenant')::uuid);

-- Policies for leaders table
CREATE POLICY leaders_isolation_policy ON leaders
  USING (tenant_id = current_setting('app.current_tenant')::uuid);

-- Policies for meetings table
CREATE POLICY meetings_isolation_policy ON meetings
  USING (tenant_id = current_setting('app.current_tenant')::uuid);

-- Policies for qr_codes table
CREATE POLICY qr_codes_isolation_policy ON qr_codes
  USING (meeting_id IN (
    SELECT id FROM meetings WHERE tenant_id = current_setting('app.current_tenant')::uuid
  ));

-- Policies for attendees table
CREATE POLICY attendees_isolation_policy ON attendees
  USING (meeting_id IN (
    SELECT id FROM meetings WHERE tenant_id = current_setting('app.current_tenant')::uuid
  ));

-- Policies for fuel_vouchers table
CREATE POLICY fuel_vouchers_isolation_policy ON fuel_vouchers
  USING (tenant_id = current_setting('app.current_tenant')::uuid);

-- Policies for transactions table
CREATE POLICY transactions_isolation_policy ON transactions
  USING (tenant_id = current_setting('app.current_tenant')::uuid);

-- Policies for social_stats table
CREATE POLICY social_stats_isolation_policy ON social_stats
  USING (tenant_id = current_setting('app.current_tenant')::uuid);

-- Create indexes for performance
CREATE INDEX idx_users_tenant_id ON users(tenant_id);
CREATE INDEX idx_subscriptions_tenant_id ON subscriptions(tenant_id);
CREATE INDEX idx_audit_logs_tenant_id ON audit_logs(tenant_id);
CREATE INDEX idx_leaders_tenant_id ON leaders(tenant_id);
CREATE INDEX idx_meetings_tenant_id ON meetings(tenant_id);
CREATE INDEX idx_fuel_vouchers_tenant_id ON fuel_vouchers(tenant_id);
CREATE INDEX idx_transactions_tenant_id ON transactions(tenant_id);
CREATE INDEX idx_social_stats_tenant_id ON social_stats(tenant_id);
