import {describe,it,expect,vi} from 'vitest';
import {render,screen} from '@testing-library/react';
import {TenantFilterLabel} from './TenantFilterLabel';

describe('TenantFilterLabel',()=>{
  it('exposes a labelled tenant selector and options',()=>{
    render(<TenantFilterLabel value="" tenants={['Cedar Finance']} onChange={vi.fn()}/>);
    expect(screen.getByRole('combobox',{name:'Tenant'}).value).toBe('');
    expect(screen.getByRole('option',{name:'Cedar Finance'})).toBeTruthy();
  });
});
