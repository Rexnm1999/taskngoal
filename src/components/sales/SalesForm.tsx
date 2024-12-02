import React, { useState } from 'react';

interface SalesFormProps {
  onSubmit: (date: Date, amount: number, description: string) => void;
}

export const SalesForm: React.FC<SalesFormProps> = ({ onSubmit }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericAmount = parseInt(amount.replace(/,/g, ''), 10);
    if (numericAmount > 0 && description.trim()) {
      onSubmit(new Date(), numericAmount, description.trim());
      setAmount('');
      setDescription('');
    }
  };

  const formatAmount = (value: string) => {
    const numericValue = value.replace(/[^\d]/g, '');
    if (numericValue === '') return '';
    return parseInt(numericValue, 10).toLocaleString();
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatAmount(e.target.value);
    setAmount(formattedValue);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="amount" className="block text-sm text-gray-600 mb-1">売上金額</label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">¥</span>
          <input
            id="amount"
            type="text"
            inputMode="numeric"
            value={amount}
            onChange={handleAmountChange}
            className="input-field pl-8"
            placeholder="0"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm text-gray-600 mb-1">摘要</label>
        <input
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="input-field"
          placeholder="取引内容を入力"
          required
        />
      </div>

      <button 
        type="submit" 
        className="btn btn-primary w-full"
        disabled={!amount || !description.trim()}
      >
        記録する
      </button>
    </form>
  );
};