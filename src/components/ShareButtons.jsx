import { TwitterShareButton, TwitterIcon, LinkedinShareButton, LinkedinIcon } from 'react-share';

const ShareButtons = () => {
  const shareUrl = 'https://yourwebsite.com';
  const title = 'Check out this new website!';

  return (
    <div className='flex flex-row '>
      <TwitterShareButton url={shareUrl} title={title}>
        <TwitterIcon size={30} round />
      </TwitterShareButton>
      <LinkedinShareButton url={shareUrl} title={title}>
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
    </div>
  );
};

export default ShareButtons;