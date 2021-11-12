const Message = ({content,position,user,sent_on}) => {

  const setDisplayId = () => {
    return (user.user_id % 8) + 1;
  }
  const formatDate = () => {
    const myDate = sent_on;
    return new Date(myDate).toLocaleTimeString('en', { timeStyle: 'short', hour12: false, timeZone: 'UTC' });
  }
  return ( 
    <li class={`chat-${position}`}>
        <div class="chat-avatar">
            <img src={`https://www.bootdey.com/img/Content/avatar/avatar${setDisplayId()}.png`} alt="Retail Admin"/>
            <div class="chat-name">{user.username}</div>
        </div>
        <div class="chat-text m-2">{content}</div>
        <div class="chat-hour">{formatDate()}<span class="fa fa-check-circle"></span></div>
    </li>
    
   );
}
 
export default Message;