import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/card';
import { Button } from '../ui/button';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    price: '$0',
    description: 'For individuals and small teams getting started.',
    features: [
      '100 AI Credits/mo',
      '1 Workspace',
      '3 Projects',
      'Basic Support',
    ],
    cta: 'Get Started for Free',
    isPopular: false,
  },
  {
    name: 'Pro',
    price: '$15',
    description: 'For growing teams that need more power and collaboration.',
    features: [
      '1,000 AI Credits/mo',
      '5 Workspaces',
      'Unlimited Projects',
      'Priority Support',
      'Advanced Analytics',
    ],
    cta: 'Choose Pro Plan',
    isPopular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations with custom needs.',
    features: [
      'Unlimited AI Credits',
      'Unlimited Workspaces',
      'Dedicated Account Manager',
      'On-premise Options',
      'Custom Integrations',
    ],
    cta: 'Contact Sales',
    isPopular: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-20 sm:py-24 lg:py-32 bg-white">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-extrabold text-primary-50 dark:text-white sm:text-4xl">
            Find the Perfect Plan
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Start for free and scale as you grow. All plans include our core features.
          </p>
        </div>
        <div className="mt-16 grid max-w-lg gap-8 lg:max-w-none lg:grid-cols-3 mx-auto">
          {plans.map((plan) => (
            <Card key={plan.name} className={`flex flex-col bg-white border-gray-200 ${plan.isPopular ? 'border-primary-50 border-2 shadow-2xl' : 'shadow-lg'}`}>
              {plan.isPopular && (
                <div className="bg-primary-50 text-center text-sm font-semibold text-white py-1 rounded-t-lg -mt-px">
                  Most Popular
                </div>
              )}
              <CardHeader className="text-center">
                <CardTitle className="font-headline text-2xl text-primary-50">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-extrabold text-primary-50">{plan.price}</span>
                  {plan.name !== 'Enterprise' && <span className="text-base font-medium text-gray-600">/ month</span>}
                </div>
                <CardDescription className="mt-4 text-gray-600">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className={`w-full ${plan.isPopular ? 'bg-primary-50 hover:bg-primary-50/90 text-white' : 'bg-white border-gray-100 text-gray-600 hover:text-white hover:bg-primary-200'}`} 
                  variant={plan.isPopular ? 'default' : 'outline'} 
                  size="lg"
                >
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
