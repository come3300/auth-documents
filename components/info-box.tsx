import { IoInformationCircle } from 'react-icons/io5';
import { IoWarning } from 'react-icons/io5';
import { IoBulb } from 'react-icons/io5';
import { AiFillAlert } from 'react-icons/ai';

interface InfoBoxProps {
  title?: string;
  type?: 'info' | 'warn' | 'tip' | 'danger';
  children: React.ReactNode;
}

export default function InfoBox({
  title,
  type = 'info',
  children
}: InfoBoxProps) {
  const configs = {
    info: {
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-400',
      titleBg: 'bg-blue-100',
      titleText: 'text-blue-900',
      bodyText: 'text-blue-800',
      Icon: IoInformationCircle,
      defaultTitle: '補足'
    },
    warn: {
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-400',
      titleBg: 'bg-yellow-100',
      titleText: 'text-yellow-900',
      bodyText: 'text-yellow-800',
      Icon: IoWarning,
      defaultTitle: '注意'
    },
    tip: {
      bgColor: 'bg-green-50',
      borderColor: 'border-green-400',
      titleBg: 'bg-green-100',
      titleText: 'text-green-900',
      bodyText: 'text-green-800',
      Icon: IoBulb,
      defaultTitle: 'ヒント'
    },
    danger: {
      bgColor: 'bg-red-50',
      borderColor: 'border-red-400',
      titleBg: 'bg-red-100',
      titleText: 'text-red-900',
      bodyText: 'text-red-800',
      Icon: AiFillAlert,
      defaultTitle: '重要'
    }
  };

  const config = configs[type];
  const displayTitle = title || config.defaultTitle;
  const IconComponent = config.Icon;

  return (
    <div className={`my-6 ${config.bgColor} ${config.borderColor} border-l-4 rounded-lg overflow-hidden shadow-sm`}>
      <div className={`${config.titleBg} px-4 py-2 font-semibold ${config.titleText} flex items-center gap-2`}>
        <IconComponent className="text-lg" />
        <span>{displayTitle}</span>
      </div>
      <div className={`px-4 py-3 ${config.bodyText} leading-relaxed`}>
        {children}
      </div>
    </div>
  );
}
