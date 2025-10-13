import { CheckoutInvoiceEnter } from '@/modules/checkoutInvoice/screens/CheckoutInvoiceEnter.tsx'
import { CheckoutInvoices } from '@/modules/checkoutInvoice/screens/CheckoutInvoices.tsx'
import { type RouteObject } from 'react-router-dom'

export const routes: RouteObject[] = [
  {
    path: '/checkout/invoices',
    element: <CheckoutInvoices />,
  },
  {
    path: '/checkout/invoice/enter',
    element: <CheckoutInvoiceEnter />,
  },
]
