import { IoInformationCircle } from 'react-icons/io5';
import { IoWarning } from 'react-icons/io5';
import { IoBulb } from 'react-icons/io5';
import { AiFillAlert } from 'react-icons/ai';

interface NoteProps {
  type?: 'info' | 'warn' | 'tip' | 'danger';
  children: React.ReactNode;
}

export default function Note({ type = 'info', children }: NoteProps) {
  const styles = {
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-500',
      Icon: IoInformationCircle,
      iconBg: 'bg-blue-500',
      textColor: 'text-blue-900'
    },
    warn: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-500',
      Icon: IoWarning,
      iconBg: 'bg-yellow-500',
      textColor: 'text-yellow-900'
    },
    tip: {
      bg: 'bg-green-50',
      border: 'border-green-500',
      Icon: IoBulb,
      iconBg: 'bg-green-500',
      textColor: 'text-green-900'
    },
    danger: {
      bg: 'bg-red-50',
      border: 'border-red-500',
      Icon: AiFillAlert,
      iconBg: 'bg-red-500',
      textColor: 'text-red-900'
    }
  };

  const style = styles[type];
  const IconComponent = style.Icon;

  return (
    <div className={`my-6 ${style.bg} ${style.border} border-l-4 rounded-r-lg p-4 flex items-start gap-3`}>
      <div className={`${style.iconBg} text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0`}>
        <IconComponent className="text-lg" />
      </div>
      <div className={`flex-1 ${style.textColor} leading-relaxed`}>
        {children}
      </div>
    </div>
  );
}
