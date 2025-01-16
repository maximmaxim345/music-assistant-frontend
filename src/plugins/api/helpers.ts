// several helpers for dealing with the api and its (media) items

import api from ".";
import {
  MediaItemType,
  ItemMapping,
  MediaType,
  BrowseFolder,
} from "./interfaces";

export const itemIsAvailable = function (
  item: MediaItemType | ItemMapping,
): boolean {
  if (item.media_type == MediaType.FOLDER) return true;
  if ("provider_mappings" in item) {
    for (const x of item.provider_mappings) {
      if (x.available && api.providers[x.provider_instance]?.available)
        return true;
    }
  } else if ("available" in item) return item.available as boolean;
  return false;
};

export const itemIsPlayable = function (
  item: MediaItemType | ItemMapping,
): boolean {
  if (
    [
      MediaType.ALBUM,
      MediaType.ARTIST,
      MediaType.PLAYLIST,
      MediaType.AUDIOBOOK,
      MediaType.PODCAST,
      MediaType.PODCAST_EPISODE,
      MediaType.RADIO,
      MediaType.TRACK,
    ].includes(item.media_type)
  )
    return true;
  if (item.media_type == MediaType.FOLDER) {
    return !(item as BrowseFolder).path?.endsWith("://");
  }
  return false;
};
