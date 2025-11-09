'use client';

interface LoadingStateProps {
  stage: 'resolving' | 'generating';
}

export default function LoadingState({ stage }: LoadingStateProps) {
  const messages = {
    resolving: {
      title: 'Finding your profile...',
      description: 'Searching across social platforms',
      icon: '🔍',
    },
    generating: {
      title: 'Creating your Colores del Sol outfit...',
      description: 'Adding vibrant reds, oranges, yellows, and purples',
      icon: '🎨',
    },
  };

  const current = messages[stage];

  return (
    <div className="flex flex-col items-center justify-center space-y-6 py-12">
      <div className="relative">
        <div className="w-24 h-24 rounded-full bg-gradient-sol animate-spin"></div>
        <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
          <span className="text-4xl animate-pulse">{current.icon}</span>
        </div>
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold text-gray-800">
          {current.title}
        </h3>
        <p className="text-sm text-gray-600">{current.description}</p>
      </div>
      <div className="flex gap-2">
        <div className="w-2 h-2 rounded-full bg-sol-red animate-bounce"></div>
        <div className="w-2 h-2 rounded-full bg-sol-orange animate-bounce delay-75"></div>
        <div className="w-2 h-2 rounded-full bg-sol-yellow animate-bounce delay-150"></div>
        <div className="w-2 h-2 rounded-full bg-sol-purple animate-bounce delay-300"></div>
      </div>
    </div>
  );
}

