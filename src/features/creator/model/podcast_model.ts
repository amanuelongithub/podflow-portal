// podcast.model.ts

import { PageMetadata } from "../../model/page";

export interface ImageData {
  image_small_path: string | null;
  image_medium_path: string | null;
  image_large_path: string | null;
}

export interface PodcastOrganizer {
  organizer_id: number | null;
  organizer_name: string | null;
  profile_image: ImageData | null;
}

export interface PodcastCategory {
  id: number | null;
  name: string | null;
}

export interface PodcastResponse {
  id: number | null;
  title: string | null;
  description: string | null;
  image_url: string | null;
  audio_url: string | null;
  category_id: number | null;
  created_at: string | null;
  updated_at: string | null;
  organizer: PodcastOrganizer | null;
  category: PodcastCategory | null;
}

export interface PodcastModel {
  status: string | null;
  page_metadata: PageMetadata | null;
  data: PodcastResponse[] | null;
}

export class PodcastModel {
  static fromRawJson(json: any): PodcastModel {
    return {
      status: json.status || null,
      page_metadata: json.page_metadata
        ? {
            length: json.page_metadata.length || null,
            size: json.page_metadata.size || null,
            page: json.page_metadata.page || null,
            last_page: json.page_metadata.last_page || null,
            start_index: json.page_metadata.start_index || null,
            end_index: json.page_metadata.end_index || null,
          }
        : null,
      data: Array.isArray(json.data)
        ? json.data.map((item: PodcastResponse) => ({
            id: item.id || null,
            title: item.title || null,
            description: item.description || null,
            image_url: item.image_url || null,
            audio_url: item.audio_url || null,
            category_id: item.category_id || null,
            created_at: item.created_at || null,
            updated_at: item.updated_at || null,
            organizer: item.organizer
              ? {
                  organizer_id: item.organizer.organizer_id || null,
                  organizer_name: item.organizer.organizer_name || null,
                  profile_image: item.organizer.profile_image
                    ? {
                        image_small_path:
                          item.organizer.profile_image.image_small_path || null,
                        image_medium_path:
                          item.organizer.profile_image.image_medium_path ||
                          null,
                        image_large_path:
                          item.organizer.profile_image.image_large_path || null,
                      }
                    : null,
                }
              : null,
            category: item.category
              ? {
                  id: item.category.id || null,
                  name: item.category.name || null,
                }
              : null,
          }))
        : null,
    };
  }

  // Convert to raw JSON (for sending to API)
  static toRawJson(model: PodcastModel): any {
    return {
      status: model.status,
      page_metadata: model.page_metadata
        ? {
            length: model.page_metadata.length,
            size: model.page_metadata.size,
            page: model.page_metadata.page,
            last_page: model.page_metadata.last_page,
            start_index: model.page_metadata.start_index,
            end_index: model.page_metadata.end_index,
          }
        : undefined,
      data: model.data?.map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        image_url: item.image_url,
        audio_url: item.audio_url,
        category_id: item.category_id,
        created_at: item.created_at,
        updated_at: item.updated_at,
        organizer: item.organizer
          ? {
              organizer_id: item.organizer.organizer_id,
              organizer_name: item.organizer.organizer_name,
              profile_image: item.organizer.profile_image
                ? {
                    image_small_path:
                      item.organizer.profile_image.image_small_path,
                    image_medium_path:
                      item.organizer.profile_image.image_medium_path,
                    image_large_path:
                      item.organizer.profile_image.image_large_path,
                  }
                : undefined,
            }
          : undefined,
        category: item.category
          ? {
              id: item.category.id,
              name: item.category.name,
            }
          : undefined,
      })),
    };
  }

  // Individual podcast copyWith
  static copyWithPodcast(
    original: PodcastResponse,
    updates: Partial<PodcastResponse>,
  ): PodcastResponse {
    return {
      id: updates.id !== undefined ? updates.id : original.id,
      title: updates.title !== undefined ? updates.title : original.title,
      description:
        updates.description !== undefined
          ? updates.description
          : original.description,
      image_url:
        updates.image_url !== undefined
          ? updates.image_url
          : original.image_url,
      audio_url:
        updates.audio_url !== undefined
          ? updates.audio_url
          : original.audio_url,
      category_id:
        updates.category_id !== undefined
          ? updates.category_id
          : original.category_id,
      created_at:
        updates.created_at !== undefined
          ? updates.created_at
          : original.created_at,
      updated_at:
        updates.updated_at !== undefined
          ? updates.updated_at
          : original.updated_at,
      organizer:
        updates.organizer !== undefined
          ? updates.organizer
          : original.organizer,
      category:
        updates.category !== undefined ? updates.category : original.category,
    };
  }

  // Create empty/default instances
  static emptyPodcastModel(): PodcastModel {
    return {
      status: null,
      page_metadata: null,
      data: null,
    };
  }

  static emptyPodcast(): PodcastResponse {
    return {
      id: null,
      title: null,
      description: null,
      image_url: null,
      audio_url: null,
      category_id: null,
      created_at: null,
      updated_at: null,
      organizer: null,
      category: null,
    };
  }
}
