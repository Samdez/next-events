import { type IContentItem, type Elements } from '@kontent-ai/delivery-sdk';
import { type Location } from './location';

/**
 * Generated by '@kontent-ai/model-generator@6.5.0'
 *
 * Event
 * Id: b31c78db-966e-425c-8179-60a0eb0e7eaa
 * Codename: event
 */
export type Event = IContentItem<{
    /**
     * Date (date_time)
     * Required: true
     * Id: 0a7ad709-3173-4b1b-af15-92cea295e742
     * Codename: date
     */
    date: Elements.DateTimeElement;

    /**
     * Description (text)
     * Required: false
     * Id: 8416df8c-6f78-42a9-9322-e0e8821c28ad
     * Codename: description
     */
    description: Elements.TextElement;

    /**
     * Image (asset)
     * Required: false
     * Id: 0ff87f53-0391-49d4-ac16-d000194491d6
     * Codename: image
     */
    image: Elements.AssetsElement;

    /**
     * Location (modular_content)
     * Required: true
     * Id: 5ebc6728-7212-4940-8b9b-746675318a21
     * Codename: location
     */
    location: Elements.LinkedItemsElement<Location>;

    /**
     * Price (number)
     * Required: false
     * Id: 3ddf4fe2-e312-4397-a758-2f25027ea992
     * Codename: price
     */
    price: Elements.NumberElement;

    /**
     * Sold Out (multiple_choice)
     * Required: false
     * Id: cf91fb2b-3773-47b5-bcca-766235eb4834
     * Codename: sold_out
     */
    sold_out: Elements.MultipleChoiceElement;

    /**
     * Ticketing url (text)
     * Required: false
     * Id: d5f9e5b7-721b-4326-b19d-eade593a997b
     * Codename: ticketing_url
     */
    ticketing_url: Elements.TextElement;

    /**
     * Title (text)
     * Required: true
     * Id: 7e29f745-bf67-4ad8-8682-c4b388f5e1b5
     * Codename: title
     */
    title: Elements.TextElement;
}>;
