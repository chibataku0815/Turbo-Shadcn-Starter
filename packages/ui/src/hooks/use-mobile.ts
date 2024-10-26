/**
 * @fileoverview
 * モバイルデバイスの判定を行うカスタムフック
 *
 * @spec
 * - 画面幅が768px未満の場合にモバイルと判定
 * - ウィンドウサイズの変更を監視
 * - SSRでの実行時はデフォルトでfalseを返す
 */

import { useEffect, useState } from 'react';

export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // 初期チェック
    checkMobile();

    // リサイズイベントの監視
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return isMobile;
}
