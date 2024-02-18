import { LikeButton } from '../like-button';
import { CopyToClipboard } from '../copy-to-clipboard';

export function UserActionBar() {
  return;
  // const avatar_url = '';
  // return (
  //   <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
  //     <div className="grid grid-cols-[auto_1fr] grid-rows-2 items-center gap-x-4">
  //       <Avatar className="row-span-2">
  //         <AvatarImage src={avatar_url} alt="Author profile picture" />
  //         <AvatarFallback />
  //       </Avatar>
  //
  //       <div className="font-bold">{name}</div>
  //       <div className="flex gap-2 text-muted-foreground">
  //         <div>Role title</div>/
  //         <time dateTime={post.created_at}>
  //           {formatPostDate(post.created_at)}
  //         </time>
  //       </div>
  //     </div>
  //   </div>
  // );
}
function ArticleActions(id: string) {
  return (
    <div className="space-x-2">
      <LikeButton post_id={id} />
      <CopyToClipboard copyHref />
    </div>
  );
}
