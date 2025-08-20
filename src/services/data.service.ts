import { Injectable } from '@angular/core';
import { Category, MenuItem, PaymentMethod } from '../app/interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  getCategories(): Category[] {
    return [
      {
        id: 'pancakes',
        title: 'Блины',
        icon: '/assets/media/menu/01.png'
      },
      {
        id: 'soups',
        title: 'Супы',
        icon: '/assets/media/menu/02.png'
      },
      {
        id: 'desserts',
        title: 'Десерты',
        icon: '/assets/media/menu/03.png'
      },
      {
        id: 'drinks',
        title: 'Напитки',
        icon: '/assets/media/menu/03.png'
      }
    ];
  }

  getMenuItems(categoryId: string): MenuItem[] {
    const items: Record<string, MenuItem[]> = {
      pancakes: [
        {
          id: 'pancake-1',
          title: 'Блин с ветчиной',
          image: '/assets/media/menu/demo-offer.jpg',
          description: 'Аппетитный горячий блинчик с ветчиной, сыром и помидорами',
          price: 200,
          available: true,
          ingredients: [
            { id: 'ing-1', title: 'Ингредиент 1', price: 30 },
            { id: 'ing-2', title: 'Ингредиент 2', price: 20 },
            { id: 'ing-3', title: 'Ингредиент 3', price: 40 }
          ]
        },
        {
          id: 'pancake-2',
          title: 'Блин с творогом',
          image: '/assets/media/menu/demo-offer.jpg',
          description: 'Нежный блин с творожной начинкой',
          price: 180,
          available: false,
          ingredients: []
        }
      ],
      soups: [
        {
          id: 'soup-1',
          title: 'Борщ украинский',
          image: '/assets/media/menu/demo-offer.jpg',
          description: 'Традиционный украинский борщ с мясом',
          price: 250,
          available: true,
          ingredients: [
            { id: 'ing-4', title: 'Сметана', price: 25 },
            { id: 'ing-5', title: 'Зелень', price: 15 }
          ]
        }
      ],
      desserts: [
        {
          id: 'dessert-1',
          title: 'Мороженое',
          image: '/assets/media/menu/demo-offer.jpg',
          description: 'Ванильное мороженое с топпингами',
          price: 120,
          available: true,
          ingredients: [
            { id: 'ing-6', title: 'Шоколад', price: 20 },
            { id: 'ing-7', title: 'Орехи', price: 30 }
          ]
        }
      ],
      drinks: [
        {
          id: 'drink-1',
          title: 'Кофе американо',
          image: '/assets/media/menu/demo-offer.jpg',
          description: 'Крепкий черный кофе',
          price: 80,
          available: true,
          ingredients: [
            { id: 'ing-8', title: 'Сахар', price: 5 },
            { id: 'ing-9', title: 'Молоко', price: 15 }
          ]
        }
      ]
    };

    return items[categoryId] || [];
  }

  getPaymentMethods(): PaymentMethod[] {
    return [
      {
        id: 'qr',
        title: 'По QR-коду',
        icon: '/assets/media/order/qr.png',
        url: '/payment?method=qr'
      },
      {
        id: 'sbp',
        title: 'Через СБП',
        icon: '/assets/media/order/sbp.png',
        url: '/payment?method=sbp'
      },
      {
        id: 'card',
        title: 'Картой',
        icon: '/assets/media/order/card.png',
        url: '/payment?method=card'
      }
    ];
  }
}