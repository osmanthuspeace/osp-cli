'use client'
export interface ErrorProps {
  error: Error & { digest?: string }; //digest为自动生成的哈希
  reset: () => void; //使用 reset() 函数提示用户尝试从错误中恢复
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </>
  );
}
