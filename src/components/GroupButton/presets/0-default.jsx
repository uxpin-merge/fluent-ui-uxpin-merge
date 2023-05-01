import * as React from 'react';
import GroupButton from '../GroupButton';

//Leave these left aligned as they show up in UXPin exactly as-is.
const defaultItems = `icon(EmojiDisappointed) Poor
icon(EmojiNeutral) Neutral
icon(Emoji2) Good`;

export default <GroupButton uxpId="groupbutton1" items={defaultItems} />;
