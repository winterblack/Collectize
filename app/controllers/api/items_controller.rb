class Api::ItemsController < ApplicationController

  def create
    @item = Item.create!(item_params)
    render :show
  end

  private

  def item_params
    params.require(:item).permit(:title, :image_url, :collection_id)
  end
end
