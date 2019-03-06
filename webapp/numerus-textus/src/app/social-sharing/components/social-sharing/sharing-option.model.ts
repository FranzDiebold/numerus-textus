export interface SharingOptionMetaTags {
    title?: string;
    description?: string;
    via?: string;
}

export interface SharingOption {
    name: string;
    color: string;
    icon: string;
    url: string;
    metaTags?: SharingOptionMetaTags;
}
