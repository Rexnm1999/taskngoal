import { FirestoreError } from 'firebase/firestore';
import { AuthError } from 'firebase/auth';

export const handleFirebaseError = (error: FirestoreError | AuthError, operation: string) => {
  console.error(`Error during ${operation}:`, error);

  switch (error.code) {
    case 'permission-denied':
      throw new Error('アクセス権限がありません。再度ログインしてください。');
    case 'not-found':
      throw new Error('データが見つかりません。');
    case 'already-exists':
      throw new Error('データが既に存在します。');
    case 'resource-exhausted':
      throw new Error('リクエスト制限を超えました。しばらく待ってから再試行してください。');
    default:
      throw new Error('操作に失敗しました。もう一度お試しください。');
  }
};