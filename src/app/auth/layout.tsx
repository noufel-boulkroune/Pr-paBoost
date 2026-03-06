/**
 * @file app/auth/layout.tsx
 * @description Auth layout — split screen: form left, PrepMed branding right.
 */

import { ReactNode } from 'react';
import { Stethoscope, BookOpen, FileText, Users, Award } from 'lucide-react';

const features = [
  { icon: BookOpen, text: 'Cours video avec les meilleurs enseignants' },
  { icon: FileText, text: 'Annales officielles des 10 dernieres annees' },
  { icon: Users,    text: 'Sessions live sur Zoom et Google Meet' },
  { icon: Award,    text: 'QCM interactifs avec corrections detaillees' },
];

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className='min-h-screen flex'>
      <div className='flex-1 flex items-center justify-center p-6 sm:p-10 bg-surface-1'>
        <div className='w-full max-w-md'>
          <div className='flex items-center justify-center gap-2.5 mb-8 lg:hidden'>
            <div className='w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center'>
              <Stethoscope className='w-5 h-5 text-white' />
            </div>
            <span className='text-heading-md font-bold text-text-primary'>
              Prep<span className='text-primary-600'>Med</span>
            </span>
          </div>
          {children}
        </div>
      </div>

      <div className='hidden lg:flex lg:w-[52%] relative overflow-hidden bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800'>
        <div className='absolute top-[-80px] right-[-80px] w-80 h-80 rounded-full bg-white/5 animate-blob' />
        <div className='absolute bottom-[-60px] left-[-60px] w-64 h-64 rounded-full bg-accent-400/10 animate-blob-reverse' />
        <div className='absolute inset-0 opacity-5' style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

        <div className='relative flex flex-col items-center justify-center w-full p-12 text-white'>
          <div className='flex items-center gap-3 mb-10'>
            <div className='w-12 h-12 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center'>
              <Stethoscope className='w-7 h-7 text-white' />
            </div>
            <span className='text-heading-xl font-bold tracking-tight'>
              Prep<span className='text-accent-400'>Med</span>
            </span>
          </div>

          <div className='text-center max-w-sm mb-10'>
            <h2 className='text-display-sm font-bold mb-3 leading-tight'>
              Reussissez votre Concours de Residanat
            </h2>
            <p className='text-body-md text-primary-200 leading-relaxed'>
              La plateforme de reference pour les futurs residents algeriens.
            </p>
          </div>

          <div className='grid grid-cols-3 gap-4 w-full max-w-sm mb-10'>
            {[
              { value: '500+', label: 'Cours' },
              { value: '10K+', label: 'Etudiants' },
              { value: '98%', label: 'Taux de reussite' },
            ].map((stat) => (
              <div key={stat.label} className='text-center p-3 rounded-xl bg-white/10 border border-white/10'>
                <div className='text-heading-lg font-bold text-accent-400'>{stat.value}</div>
                <div className='text-caption text-primary-200 mt-0.5'>{stat.label}</div>
              </div>
            ))}
          </div>

          <ul className='space-y-3 w-full max-w-sm'>
            {features.map(({ icon: Icon, text }) => (
              <li key={text} className='flex items-center gap-3'>
                <div className='w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0'>
                  <Icon className='w-4 h-4 text-accent-400' />
                </div>
                <span className='text-body-sm text-primary-100 font-medium'>{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
