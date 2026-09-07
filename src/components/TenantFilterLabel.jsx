export function TenantFilterLabel({value, tenants, onChange}) {
  return <label>
    Tenant
    <select aria-label="Tenant" value={value} onChange={onChange}>
      <option value="">All tenants</option>
      {tenants.map(tenant => <option key={tenant}>{tenant}</option>)}
    </select>
  </label>;
}
