import {
  FileTextOutlined,
  FolderOpenOutlined,
  LinkOutlined,
} from '@ant-design/icons';

type Props = {
  type?: 'url' | 'file' | 'folder';
};

export function TypeIcon({ type }: Props) {
  if (type === 'url') {
    return <LinkOutlined />;
  }
  if (type === 'folder') {
    return <FolderOpenOutlined />;
  }
  if (type === 'file') {
    return <FileTextOutlined />;
  }
  return null;
}
