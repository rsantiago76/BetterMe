import { createBrowserRouter } from 'react-router';
import HomePage from './pages/home';
import TechniquesPage from './pages/techniques';
import NutritionPage from './pages/nutrition';
import SupplementsPage from './pages/supplements';
import RecipesPage from './pages/recipes';
import MealsPage from './pages/meals';
import PlannerPage from './pages/planner';
import ShakeCardsDemoPage from './pages/shake-cards-demo';
import SingleShakeExamplePage from './pages/single-shake-example';
import MassBuilderShakePage from './pages/mass-builder-shake';
import LeanGreenShakePage from './pages/lean-green-shake';
import PeanutButterRecoveryPage from './pages/peanut-butter-recovery';
import OatmealBreakfastBuilderPage from './pages/oatmeal-breakfast-builder';
import NightRecoveryCaseinPage from './pages/night-recovery-casein';
import MacroCalculatorPage from './pages/macro-calculator';
import SupplementTimingPage from './pages/supplement-timing';
import MealPrepPlanPage from './pages/meal-prep-plan';
import PricingPage from './pages/pricing';
import FeatureDemoPage from './pages/feature-demo';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import DashboardPage from './pages/dashboard';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: HomePage,
  },
  {
    path: '/login',
    Component: LoginPage,
  },
  {
    path: '/register',
    Component: RegisterPage,
  },
  {
    path: '/dashboard',
    Component: DashboardPage,
  },
  {
    path: '/techniques',
    Component: TechniquesPage,
  },
  {
    path: '/nutrition',
    Component: NutritionPage,
  },
  {
    path: '/supplements',
    Component: SupplementsPage,
  },
  {
    path: '/recipes',
    Component: RecipesPage,
  },
  {
    path: '/meals',
    Component: MealsPage,
  },
  {
    path: '/planner',
    Component: PlannerPage,
  },
  {
    path: '/shake-cards',
    Component: ShakeCardsDemoPage,
  },
  {
    path: '/shake-example',
    Component: SingleShakeExamplePage,
  },
  {
    path: '/mass-builder',
    Component: MassBuilderShakePage,
  },
  {
    path: '/lean-green',
    Component: LeanGreenShakePage,
  },
  {
    path: '/recovery-blend',
    Component: PeanutButterRecoveryPage,
  },
  {
    path: '/breakfast-builder',
    Component: OatmealBreakfastBuilderPage,
  },
  {
    path: '/night-casein',
    Component: NightRecoveryCaseinPage,
  },
  {
    path: '/calculator',
    Component: MacroCalculatorPage,
  },
  {
    path: '/supplement-timing',
    Component: SupplementTimingPage,
  },
  {
    path: '/meal-prep',
    Component: MealPrepPlanPage,
  },
  {
    path: '/pricing',
    Component: PricingPage,
  },
  {
    path: '/feature-demo',
    Component: FeatureDemoPage,
  },
]);