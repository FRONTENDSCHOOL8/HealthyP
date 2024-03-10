import DOMPurify from "dompurify";

interface PurifiedTextProps {
  textContent: string;
}
export function PurifiedText({textContent} : PurifiedTextProps) {
  const clearHTML = DOMPurify.sanitize(textContent, {
    ALLOWED_TAGS: ['br', 'em', 'strong', 'p'],
  });
  return (
    <>
      <p className="text-foot" dangerouslySetInnerHTML={{ __html: clearHTML }} />
    </>
  )
}